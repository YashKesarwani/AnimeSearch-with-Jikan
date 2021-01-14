import Header from './components/Header';
import {useState} from 'react';
import MainContent from './components/MainContent';
import Loader from 'react-loader-spinner';

function App() {
  const [animeList,SetAnimeList]=useState([]);
  const [search,SetSearch]=useState("");
  const [visible,SetVisible]=useState(8);
  const [isLoading,SetLoading]=useState(false);
  const [noData,SetNoData]=useState(false);

  const HandleSearch=e=>{
    e.preventDefault();
    SetLoading(true);
    FetchAnime(search);
  }

  const ShowMore=()=>{
    SetLoading(true);
    SetVisible((prevValue)=>prevValue+4);
    SetLoading(false);
  }

  const FetchAnime=async (query)=>{
    const temp=await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc`)
    .then(res=>res.json());
    temp.results.length===0?SetNoData(true):SetNoData(false);
    SetAnimeList(temp.results);
    setTimeout(()=>{SetLoading(false);},300)
  }

  return (
    <div className="App">
      <Header/>
      
      <div className="content-wrap">
        {isLoading ? (<center><Loader type="TailSpin" color="#00BFFF" height={80} width={80}/></center>):
          (<div ><center><h2>Search for an anime</h2></center>
          <MainContent HandleSearch={HandleSearch} search={search} noData={noData}
            SetSearch={SetSearch} animeList={animeList} visible={visible} ShowMore={ShowMore} limitTo={animeList.length}/></div>)}
      </div>

    </div>
  );
}

export default App;
