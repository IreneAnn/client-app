
interface Props{
    name:string
    makeSound:(sound:string)=>void;
}

export default function DuckItem({name,makeSound}:Props) {
  return (
    <div key={name}>
    <span>{name}</span>
    <button onClick={()=>(makeSound(name+' quack'))}>Make sound</button>
    </div>
  )
}
