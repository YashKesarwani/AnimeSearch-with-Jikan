import Header from './components/Header';
import {useState} from 'react';
import MainContent from './components/MainContent';
import Loader from 'react-loader-spinner';

function App() {
  const [animeList,SetAnimeList]=useState([]);
  const [search,SetSearch]=useState("");
  const [lastPage,SetLastPage]=useState(1);
  const [isLoading,SetLoading]=useState(false);
  const [noData,SetNoData]=useState(false);
  const [currPage,SetCurrPage]=useState(1);

  const HandleSearch=e=>{
    e.preventDefault();
    FetchAnime(search,currPage);
  }

  const ShowMore=()=>{
    // SetLoading(true);
    SetCurrPage((prevValue)=>prevValue+1);
    FetchAnime(search,currPage);
    // SetLoading(false);
  }

  const FetchAnime=async (query,currPage)=>{
    SetLoading(true);
    const temp=await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&page=${currPage}`)
    .then(res=>res.json());
    temp.results.length===0?SetNoData(true):SetNoData(false);
    SetAnimeList((prevValue)=>prevValue.concat(temp.results));
    SetLastPage(temp.results.nbPages);
    SetLoading(false);
  }

  return (
    <div className="App">
      <Header/>
      
      <div className="content-wrap">
        {isLoading ? (<center><Loader type="TailSpin" color="#00BFFF" height={80} width={80}/></center>):
          (<div ><center><h2>Search for an anime</h2></center>
          <MainContent HandleSearch={HandleSearch} search={search} noData={noData} SetSearch={SetSearch} animeList={animeList}
            ShowMore={ShowMore} currPage={currPage} lastPage={lastPage} /></div>)}
      </div>

    </div>
  );
}

export default App;
