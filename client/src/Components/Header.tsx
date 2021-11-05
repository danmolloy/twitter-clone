export const Header = (props: any) => {
  return (
    <div className="w-full p-2 border-b">
      <h2 className="text-xl font-semibold">{props.pageTitle}</h2>
    </div>
  )
}