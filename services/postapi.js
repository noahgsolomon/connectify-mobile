

const jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJub2Foc29sb21vbiIsImlhdCI6MTY4NDU0MDM0NSwiZXhwIjoxNjg1MTQ1MTQ1fQ.AWHJkx73SUrxnxOIMh_IMHgZuRHTn6-0bYIiH1Gpb_w';

async function addLikeBookmark(postId, liked, bookmarked) {
    let model = {
        liked: liked,
        bookmark: bookmarked
    }
    const response = await fetch(`https://appconnectify.herokuapp.com/posts/${postId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`},
        body: JSON.stringify(model)
    });
    await response;
}

async function getLikeBookmark(postId) {
    const url = `https://appconnectify.herokuapp.com/post-interactions/${postId}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`}
    });

    if (response.ok) {
        const data = await response.json();
        return {
            liked: data.liked,
            bookmark: data.bookmark
        };
    } else {
        console.error('Error fetching data:', response.statusText);
        throw EvalError
    }
}

export {
    addLikeBookmark,
    getLikeBookmark
}