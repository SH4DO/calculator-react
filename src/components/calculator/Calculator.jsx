import React, {useRef,useEffect,useState} from 'react';
import './calculator.css';
import {btns, BTN_ACTIONS} from './btnConfig';
import Buttons from './Buttons';

function Calculator() {

    const btnsRef = useRef(null);
    const expRef = useRef(null);

    const [expression, setExpression] = useState('');

    useEffect (() =>{
        const btns = Array.from(btnsRef.current.querySelectorAll('button'));
        btns.forEach((e)=>{e.style.height = e.offsetWidth + 'px'});
    },[] );

    const btnClick = (item) =>{
        const expDiv = expRef.current;

        if(item.action === BTN_ACTIONS.THEME) document.body.classList.toggle('dark');

        if(item.action === BTN_ACTIONS.ADD) {
            addAnimSpan(item.display);

            // valida si es X ya que la X es la unica que no usa el mismo simbolo en las operaciones
            // si es diferente de X añade directo a la cadena y si es igual añade * 
            //para que pueda desarrollarse la operacion de multiplicacion
            const oper = item.display !== 'x' ? item.display : '*';
            setExpression(expression + oper);

        }

        if(item.action === BTN_ACTIONS.DELETE){
            expDiv.parentNode.querySelector('div:last-child').innerHTML = '';
            expDiv.innerHTML = '';

            setExpression('');
        }

        if(item.action === BTN_ACTIONS.CALC){
            if(expression.trim().length <=0) return ;

            expDiv.parentNode.querySelector('div:last-child').remove();

            const cloneNode = expDiv.cloneNode(true);
            expDiv.parentNode.appendChild(cloneNode);

            const transform = `translateY(${-(expDiv.offsetHeight + 10) + 'px'}) scale(0.4)`;

            try {
                // eval sirve para evaluar la expresion ingresada, en este caso evalua la operacion y resuelve las operaciones
                // de la calculadora de forma automatica aunque no es algo recomendable usar eval.
                let res = eval(expression);

                setExpression(res.toString());
                setTimeout(()=>{
                    cloneNode.style.transform = transform;
                    expDiv.innerHTML = '';
                    addAnimSpan(Math.floor(res*100000000)/100000000);
                },200);

            } catch (error) {
                setTimeout(()=>{
                    cloneNode.style.transform = transform;
                    expDiv.innerHTML = 'Syntax Error';
                },200); 
            } finally {
                console.log('calc complete');
            }


        }
    }

    const addAnimSpan = (content)=>{
        const expDiv = expRef.current;
        const span = document.createElement('span');

        span.innerHTML = content;
        span.style.opacity = 0;
        expDiv.appendChild(span);

        const width = span.offsetWidth + 'px';
        span.style.width = 0;



        setTimeout(()=>{
            span.style.opacity=1;
            span.style.width = width;
        },100);
    };


  return (
    <div className='calculator'>
        <div className='calculator_result'>
            <div ref={expRef} className='calculator__result__exp'></div>
            <div className='calculator__result__exp'></div>
        </div>
        <div ref={btnsRef} className="calculator__btns">
            {
                btns.map((item,index)=>(
                    <Buttons 
                    index={index} 
                    item={item} 
                    onClick={btnClick}/>
                ))
            }
        </div>
    </div>
  )
}
export default Calculator;