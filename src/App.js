
import Cart from './Pages/Cart_page/Cart';
import img from "./Assets/pizza_img.png";


function App() {
  
  return (
    <div className="App">
     <Cart img={img} quantity={0}/>
    </div>
  );
}

export default App;
