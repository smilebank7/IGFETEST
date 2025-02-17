import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function SurveySkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
        </CardFooter>
      </Card>
    </div>
  )
} 