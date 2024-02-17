import AdminButton from "@/features/AdminButton"

export default async function Admin_panel() {
  return (
    <div className="grid w-full justify-center pt-40 h-lvh ">
      <h1 className="text-3xl">Train and flex, with your friends!</h1>
      <AdminButton grupId="65d0eed5b02be995dd5c9355" />
      <AdminButton grupId="65d0e71446672e0d8af789ae"/>
      <AdminButton grupId="65d0ef04b02be995dd5c9356"/>
      <AdminButton grupId="65d0ef2fb02be995dd5c9358"/>
      <AdminButton grupId="65d0ef3eb02be995dd5c9359"/>
      <AdminButton grupId="65d0ef19b02be995dd5c9357"/>
    </div>
  )
}
