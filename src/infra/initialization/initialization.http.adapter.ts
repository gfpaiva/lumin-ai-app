import { InitializationPort } from '../../common/ports/initialization.port';
import { FetchAdapter } from '../http/fetch.adapter';
import { useBimesterStore } from '../store/bimester.store';
import { useSchoolStore } from '../store/school.store';
import { useClassStore } from '../store/class.store';
import { Bimester } from '@/src/features/bimester/types/bimester.types';
import { School } from '@/src/features/school/types/school.types';
import { Class } from '@/src/features/class/types/class.types';

export class InitializationHttpAdapter implements InitializationPort {
  private readonly http: FetchAdapter;

  constructor() {
    this.http = new FetchAdapter();
  }

  async initialize(): Promise<void> {
    try {
      // 1. Fetch Bimesters and Schools in parallel
      const [bimestersRes, schoolsRes] = await Promise.allSettled([
        this.http.get<Bimester[]>('/bimesters'),
        this.http.get<School[]>('/schools'),
      ]);

      if (bimestersRes.status === 'fulfilled' && bimestersRes.value?.data) {
        useBimesterStore.getState().setBimesters(bimestersRes.value.data);
      } else {
        console.warn('Failed to load bimesters during initialization:', bimestersRes);
      }
      
      let selectedSchoolId: string | null = null;
      if (schoolsRes.status === 'fulfilled' && schoolsRes.value?.data) {
        useSchoolStore.getState().setSchools(schoolsRes.value.data);
        // setSchools automatically selects the first school if none is selected
        selectedSchoolId = useSchoolStore.getState().selectedSchoolId;
      } else {
        console.warn('Failed to load schools during initialization:', schoolsRes);
      }

      // 2. Fetch Classes for the selected school (if any)
      if (selectedSchoolId) {
        const classesRes = await this.http.get<Class[]>(`/classes?schoolId=${selectedSchoolId}`);
        if (classesRes.data) {
          const classStore = useClassStore.getState();
          classStore.setClasses(classesRes.data);
          classStore.markSchoolAsFetched(selectedSchoolId);
        }
      }
    } catch (error) {
      console.error('Fatal initialization error:', error);
      // We log but do not throw, so the app can continue with empty state
    }
  }
}
