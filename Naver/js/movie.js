// ========= API ==========
const MOVIE_API_KEY = 'd4f510ee596cdef59915335d15c4c13a';
const IMG_URL_START = `https://image.tmdb.org/t/p/w500`;
const SEARCH_META = `/movie/now_playing`;

//  ======= DOM Element =======
const NEW_MOVIES = document.querySelector('.new_movies');
const MOVIE_UPDATED_DATE = document.querySelector('.side_movie_updated_date');


get_movie_data();
async function get_movie_data() {
    const API_LINK =`https://api.themoviedb.org/3${SEARCH_META}?api_key=${MOVIE_API_KEY}`;
    const result_data = await fetch(API_LINK).then(response => response.json()); 
    let updated_date = result_data.dates.maximum; 
    let result_datas = result_data.results;
    let index = 0;
    result_datas.forEach(data_result => {
        if (index >= 6) {
            return;
        }
        console.log(data_result);
        // Container for each data
        let div = document.createElement("div");
        // div.style.backgroundColor = "red";
        div.style.margin = "0.4rem";
        div.style.marginBottom = "1rem";
        // Img
        let img_poster = document.createElement("img");
        img_poster.src = `${IMG_URL_START}${data_result.poster_path}`;
        // End Img
        // Title
        let h4 = document.createElement("h4");
        let textNode = document.createTextNode(data_result.original_title);
        h4.appendChild(textNode);
        // End Title
        // Release date
        let p_release_date = document.createElement("p");
        let textNode_release_date = document.createTextNode(`Released: ${data_result.release_date}`);
        p_release_date.appendChild(textNode_release_date);
        // End Release date
        // Overview
        let p_over_view = document.createElement("p");
        let textNode_over_view = document.createTextNode(`Description: ${data_result.overview.substring(0,20)}...`);
        p_over_view.appendChild(textNode_over_view);
        // End Overview
        // Popularity
        let p_popularity = document.createElement("p");
        if (data_result.popularity >= 100) {
            data_result.popularity = 100;
        }
        p_popularity.innerHTML = `<i style="color: red" class="fa fa-star checked" aria-hidden="true"></i> <strong>${data_result.popularity}</strong>`;
        
        div.appendChild(img_poster);
        div.appendChild(h4);
        div.appendChild(p_release_date);
        div.appendChild(p_over_view);
        div.appendChild(p_popularity);
        NEW_MOVIES.appendChild(div);
        index++;
    });

    // Apply DOM Data
    MOVIE_UPDATED_DATE.textContent = `Data Valid Date: ${updated_date}`;
}
