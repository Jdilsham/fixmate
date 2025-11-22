export default function Btn(props) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.bg} ${props.textColor} w-[250px] h-[41px] rounded-[15px] align-middle font-semibold  hover:scale-105 duration-300 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] `}
    >
      {props.label}
    </button>
  );
}
