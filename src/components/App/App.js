import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import About from '../About/About';
import Projects from '../Projects/Projects';
import AppFooter from '../AppFooter/AppFooter';

function App() {
  return (
    <div className="page">
      <AppHeader></AppHeader>
      <main>
        <About></About>
        <Projects></Projects>
      </main>
      <AppFooter></AppFooter>
    </div>
  );
}

export default App;
