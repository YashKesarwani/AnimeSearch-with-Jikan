import React from 'react'
import AnimeCard from './AnimeCard'

function MainContent(props) {
    return (
        <main>
            <div className="main-head">
            
                <form className="search-box" onSubmit={props.HandleSearch}>        
                    <input type="search" placeholder="Search for an anime" required value={props.search} onChange={e=>props.SetSearch(e.target.value)}/>
                    <button>Go</button>
                </form>
                
            </div>
            <div className="anime-list">
                {props.noData?(<div><h2 style={{position:"absolute", left:"45%"}}>No Anime Found</h2></div>):
                    props.animeList.slice(0,props.visible).map(anime=>(
                    <AnimeCard
                        anime={anime}
                        key={anime.mal_id} />
                ))}
            </div>
            <div className="load-more">
                {console.log(props.limitTo)}
                <button style={{ display: props.limitTo===0 || props.limitTo<=props.visible  ? 'none' : 'block' }} onClick={props.ShowMore}>Load More</button>
            </div>
        </main>
    )
}

export default MainContent
