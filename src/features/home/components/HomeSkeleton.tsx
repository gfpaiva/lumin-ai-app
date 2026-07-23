import { View } from "react-native";
import { Skeleton, SkeletonText } from "@/src/components/ui/skeleton";
import { ScreenBackground } from "@/src/components/screen-background";
import { Header } from "@/src/components/header";

export function HomeSkeleton() {
  return (
    <ScreenBackground>
      <View className="flex-1">
        <Header />

        {/* Welcome Section Skeleton */}
        <View className="mt-6 mb-8">
          <SkeletonText _lines={1} className="h-8 w-48 mb-2" />
          <SkeletonText _lines={1} className="h-6 w-32" />
        </View>

        {/* School Selector Skeleton */}
        <View className="mb-6">
          <Skeleton variant="rounded" className="h-16 w-full rounded-2xl" />
        </View>

        {/* Classes List Skeleton */}
        <View className="flex-1 space-y-4">
          <Skeleton variant="rounded" className="h-24 w-full rounded-2xl mb-4" />
          <Skeleton variant="rounded" className="h-24 w-full rounded-2xl mb-4" />
          <Skeleton variant="rounded" className="h-24 w-full rounded-2xl mb-4" />
        </View>

        {/* Bottom Action Skeleton */}
        <View className="pb-6">
          <Skeleton variant="rounded" className="h-14 w-full rounded-full" />
        </View>
      </View>
    </ScreenBackground>
  );
}
