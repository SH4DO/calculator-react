import './buttons.css';


function Buttons({index ,item , onClick}) {

  return (
    <button 
        key={index} 
        className={item.class} 
        onClick={()=> onClick(item)}
    >
        {item.display}
    </button>
  )
}

export default Buttons ; 