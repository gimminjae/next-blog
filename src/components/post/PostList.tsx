import React, { memo, useEffect, useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useRouter } from "next/router"

interface DataSet {
  error: any
  postList: Post[] | any
}
const PostList = ({ error, postList }: DataSet) => {
  const router = useRouter()
  const [data, setData] = useState<any>([])

  useEffect(() => {
    if (!data?.length) setData(postList)
  }, [postList])

  const columns = [
    {
      // field: "id",
      header: "NO",
      body: (dtData: any, dtOption: any) => {
        console.log(dtData, dtOption)
        return <span>{dtOption.rowIndex + 1}</span>
      },
      style: { textAlign: "center" as const },
    },
    { field: "title", header: "제목" },
    { field: "createdAt", header: "작성일시" },
    { field: "updatedAt", header: "최근 수정일시" },
  ]
  return (
    <>
      {error && <p>{error.message}</p>}
      <div className="mx-auto gap-3 animate-fade-up xl:place-items-center">
        <DataTable
          lazy
          value={data}
          reorderableRows
          onRowReorder={(e: any) => setData(e.value)}
          tableStyle={{ minWidth: "50rem" }}
          scrollable
          scrollHeight="80%"
          selectionMode="single"
          dataKey="id"
          onSelectionChange={(e) => router.push(`/post/${e.value.id}`)}
        >
          <Column rowReorder style={{ width: "3rem", textAlign: "center" }} />
          {columns.map((col, i) => {
            return (
              <Column
                {...col}
                key={`${col.field}-${i}`}
              />
            )
          })}
        </DataTable>
        {/* {postList &&
          Array.isArray(postList) &&
          postList?.length > 0 &&
          // eslint-disable-next-line react/jsx-key
          postList.map((post: Post, index: number) => (
            <Post key={index} post={post} />
          ))} */}
      </div>
    </>
  )
}
export default memo(PostList)
