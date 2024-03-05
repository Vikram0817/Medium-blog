
interface props {
    label: string;
    onClick: () => void;
}
function Button({label, onClick}: props) {
  return (
    <button onClick={onClick} className='border rounded-2xl bg-black text-white p-1 w-1/2 hover:bg-slate-400'>{label}</button>
  )
}

export default Button