import { Clock, Play } from "lucide-react"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export const AlbumSkeleton = () => {
  return (
    <section className="h-full">
      <ScrollArea className="h-full rounded-md">
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <div className="w-[240px] h-[240px] bg-zinc-800 rounded animate-pulse" />
              <div className="flex flex-col justify-end">
                <div className="w-16 h-4 bg-zinc-800 rounded animate-pulse" />
                <div className="w-64 h-16 my-4 bg-zinc-800 rounded animate-pulse" />
                <div className="flex items-center gap-2">
                  <div className="w-32 h-4 bg-zinc-800 rounded animate-pulse" />
                  <div className="w-24 h-4 bg-zinc-800 rounded animate-pulse" />
                  <div className="w-16 h-4 bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                <Play className="w-7 h-7 text-black" />
              </Button>
            </div>
            <Table className="bg-black/20 backdrop-blur-sm">
              <TableHeader>
                <TableRow className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                  <TableHead>#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Released Date</TableHead>
                  <TableHead>
                    <Clock className="size-4" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="flex flex-col space-y-2 py-4 px-4">
                {[...Array(5)].map((_, index) => (
                  <TableRow
                    key={index}
                    className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-6 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                  >
                    <TableCell className="flex items-center justify-center">
                      <div className="w-4 h-4 bg-zinc-800 rounded animate-pulse" />
                    </TableCell>
                    <TableCell className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-800 rounded animate-pulse" />
                      <div>
                        <div className="w-32 h-4 bg-zinc-800 rounded animate-pulse mb-1" />
                        <div className="w-24 h-3 bg-zinc-800 rounded animate-pulse" />
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="w-24 h-4 bg-zinc-800 rounded animate-pulse" />
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="w-12 h-4 bg-zinc-800 rounded animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ScrollArea>
    </section>
  )
}
