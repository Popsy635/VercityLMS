type HeadingProps = {
    label: string,
    style: string
    
}


export const Heading = ({style, label}:HeadingProps) => {
  return (
    <div><h1 className={style}>{label}</h1></div>
  )
}
