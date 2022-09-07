
import './App.css';
import {useEffect,useRef, useState} from 'react';
import _ from 'lodash';


// only thing left is to set time out before the winning message appear and to organize and github the code

function App() {

  // useRef array to write down all the photo elements in it
  
  const canvasRef = useRef(null)

  const [items,setItems] = useState([])
  const [middleArr,setMiddleArr] = useState([])
  const [isDragging, setIsDragging] = useState(false);
  const[draggedItem,setDraggedItem] = useState(null);
  const[droppingArea,setDroppingArea] = useState(null);
  const[isWon,setIsWon] = useState(false);
  const[isDone,setIsDone] = useState(true);
  const [comparingArr, setComparingArr] =useState([])
  const [countScore, setCountScore] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [colNum,setColNum] = useState(0);
  
  let images = [];
  let imagePieces = [];
  let randomArr = [];
  

function arraymove(arr,fromIndex,toIndex) {
  var element = arr[fromIndex];
  arr[fromIndex] = arr[toIndex];
  arr[toIndex] = element;
}

  useEffect(() => {
   
    const img = new Image();
    img.src = '/img/ew.jpg' 
      img.onload = function() {
        // replace the 4 with rowsNum and the other 4 with colNum
        // if the gmae mode is easy then the columns/rows number is 6 * 6 & medium 9*9 & hard 12*12
       
            for(var j = 0; j < colNum; j++) {
              for(var i = 0; i < colNum; i++) {
              //var canvas = document.getElementById('canvas1');
              var imgWidth = this.width;
              var imgHeight = this.height;
              var x = i*(imgWidth/colNum);
              var y = j*(imgHeight/colNum);
              /*var x = i*400;
              var y = j*225;*/
              var canvas = canvasRef.current;
             // var canvas = document.getElementById('canvas1');
              var context = canvas.getContext('2d');
              context.drawImage(img, x , y ,imgWidth/colNum ,(imgHeight/colNum)*2 , 0,0, 300, 300);
               // u need to divide the img width in pixeles on the number of columns and the img height on the number of rows the results will be 
               // stored in x and y respectively 
               // on the draImage function u put the third and the fourth variables to x and 2*y and the last 2 to 300, 300
             
              imagePieces.push(canvas.toDataURL());
              images.push(canvas.toDataURL());
               console.log(x)
              // setComparingArr(imagePieces)
              
            }
        }
        //shuffle(imagePieces);
      //  items = imagePieces.cuimagePiecesimagePieces = imagePieces.map((str,index) => ({value:str,id:index+1}))
      setItems(shuffle(imagePieces.map((str,index) => ({value:str,id:index}))));
      

      
      
      setComparingArr(images.map((str,index) => ({value:str,id:index})));
     // bbbbbbbbbbbbbbbbbbbb zahbsetComparingArr(items);
     console.log(colNum,'now');
      
    } 
    
  },[colNum])
// because comparing array is now set to the right order so we need only to change the first order of the pieces and make it random
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
  const setWinningArr = () => {
    arraymove(items,2,4)
    arraymove(items,1,8)
    arraymove(items,4,12)
    arraymove(items,3,9)
    arraymove(items,5,13)
    arraymove(items,7,14)
    console.log('its called')
    setIsDone(false)
  }
  
  
  const handleDragStart = (e,params) => {
    if(!isWon){
      setCountScore(countScore+1);
    }
    
    setIsDragging(true);
    setDraggedItem(params);
    console.log('Dragging is started',params.id)
    
    
  }

  const draggedItemClassName = (params) => {
    const currentItem = draggedItem;
    if(currentItem === params){
      return 'dnd-opacity'
    }
    return ''

  }

  function handleDragEnter(e,params) {
    setDroppingArea(params);
    // console.log('item entered',params.id)
     if(droppingArea){
      // console.log(droppingArea.id)
     }
   }
   
    const checkWinning = () =>{
   
    var _ = require('lodash')
    let p = _.isEqual(items,comparingArr)
    
   // console.log(isWon)
    p?setTimeout(() => {setIsWon(true)},3000):console.log('NO LUCK YET?!')
   // console.log(comparingArr.length)
    console.log(comparingArr)
    console.log(items)
    console.log(countScore);
  }

  const handleDragEnd = (e) => {
    

    if(isDone){
      //setWinningArr();
    //  setItems(randomArr)
    //shuffle(items)
    
    }
    arraymove(items,items.indexOf(droppingArea),items.indexOf(draggedItem))
    setIsDragging(false);
   // console.log(res1)
    checkWinning();
  }
  
  const chooseDifficulty = (e) => {
    if(e.target.innerHTML === 'easy'){
      setDifficulty('1fr 1fr 1fr 1fr 1fr');
      setColNum(5)
      
      
    }
    if(e.target.innerHTML === 'medium'){
      setDifficulty('1fr 1fr 1fr 1fr 1fr 1fr');
      setColNum(6)
    }
    if(e.target.innerHTML === 'hard'){
      setDifficulty('1fr 1fr 1fr 1fr 1fr 1fr 1fr');
      setColNum(7)
    //  console.log(e.target.innerHTML)
      console.log(colNum)
    }
    
  }
  
  
  return (
    
        <div className="App">
         
          <canvas id='canvas1' ref={canvasRef}>
          </canvas>
              <button className = 'game-button green' onClick={(e) => chooseDifficulty(e)}>easy</button>
              <button className = 'game-button orange' onClick={(e) => chooseDifficulty(e)}>medium</button>
              <button className = 'game-button red' onClick={(e) => chooseDifficulty(e)}>hard</button>
              <h1 style={{opacity:isWon?1:0}}>Congtatulations!! you solved it in {countScore} moves</h1>
              <div className='grid' style={{opacity:isWon?0:1, gridTemplateColumns:difficulty }}>
               
            {items.map((item) => (
              <img  
              draggable 
              onDragStart = {(e) => handleDragStart(e,item)} 
              onDragEnd = {(e) => handleDragEnd(e)}
              onDragEnter={(e) => handleDragEnter(e,item)}
              
              key={item.id} src={item.value} 
              alt={item.id} 
              className={isDragging?draggedItemClassName(item):''}
              //style={{opacity:isDragging ?0.5 : 1}} 
              />
            ))}
            
            </div>
             
        </div>
    
  );
}

export default App;
