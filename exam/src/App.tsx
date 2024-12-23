import { HashRouter, Route, Routes} from 'react-router-dom';
import './App.scss'
import { MainPage } from './pages/MainPage/MainPage';
import { HistoryPage } from './pages/HistoryPage/HistoryPage';

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/history' element={<HistoryPage/>} />
        </Routes>
      </HashRouter>
  )
}

export default App
