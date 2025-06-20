import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SkeletonRow = () => (
  <TableRow>
    <TableCell className="animate-pulse">
      <div className="flex items-center gap-2">
        <div className="rounded-full h-4 w-4 bg-muted" />
        <div className="h-4 bg-muted rounded w-24 sm:w-32 md:w-40" />
      </div>
    </TableCell>
    <TableCell className="animate-pulse">
      <div className="h-4 bg-muted rounded w-16" />
    </TableCell>
    <TableCell className="animate-pulse">
      <div className="flex -space-x-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 w-6 rounded-full bg-muted border-2 border-white" />
        ))}
      </div>
    </TableCell>
    <TableCell className="animate-pulse text-right">
      <div className="h-4 bg-muted rounded w-20 ml-auto" />
    </TableCell>
    <TableCell className="animate-pulse text-right">
      <div className="h-4 bg-muted rounded w-20 ml-auto" />
    </TableCell>
    <TableCell className="animate-pulse text-right">
      <div className="flex justify-end gap-2">
        <div className="h-6 w-6 rounded bg-muted" />
        <div className="h-6 w-6 rounded bg-muted" />
      </div>
    </TableCell>
  </TableRow>
);

const SkeletonTable = ({ rowCount = 5, isTrash = false }) => (
  <Table className={`bg-background rounded-xl text-xs`}>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[80px] sm:w-[120px] md:w-[160px]">Task Title</TableHead>
        <TableHead className="w-[80px] sm:w-[100px]">Priority</TableHead>
        <TableHead className="w-[100px] sm:w-[160px]">Team</TableHead>
        <TableHead className="text-right w-[100px] sm:w-[140px]">Created At</TableHead>
        {isTrash && <TableHead className="text-right w-[100px] sm:w-[140px]">Updated At</TableHead>}
        {isTrash && <TableHead className="text-right w-[100px] sm:w-[140px]">Actions</TableHead>}
      </TableRow>
    </TableHeader>

    <TableBody>
      {Array.from({ length: rowCount }).map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </TableBody>
  </Table>
);

export default SkeletonTable;
