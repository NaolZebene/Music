const Music = require("../model/Music");
const wrapAsync = require('../util/wrapAsync')

module.exports.CreateMusic = wrapAsync(async (req, res) => {
  const { title, genre, album, artist } = req.body;

  const data = { title: title, genre: genre, album: album, artist: artist };

  const newMusic = new Music(data);

  await newMusic.save();

  return res.json({
    payload: newMusic,
    status: true,
  });
})

module.exports.EditMusic = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const music = await Music.findById(id);

  if (!music) {
    return res.json({
      status: false,
      msg: "Music Not Found",
    });
  }

  const { title, genre, album, artist } = req.body;

  const data = { title, genre, album, artist };

  await Music.findByIdAndUpdate(id, data);

  return res.json({
    status: true,
    msg: "Music Updates Success",
  });
})

module.exports.DeleteMusic = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const music = await Music.findById(id);

  if (!music) {
    return res.json({
      status: false,
      msg: "Music Not Found",
    });
  }

  await Music.findByIdAndDelete(id);

  return res.json({
    status: true,
    msg: "Music Deleted Success",
  });
})

module.exports.GetAllMusic = wrapAsync(async (req, res) => {
  const data = await Music.find();

  return res.json({
    status: true,
    payload: data,
  });
})

module.exports.GetDetails = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const music = await Music.findById(id);

  if (!music) {
    return res.json({
      status: false,
      msg: "Music Not Found",
    });
  }

  return res.json({
    status: true,
    payload: music,
  });
})

module.exports.GetTotalNumberOfMusic = wrapAsync(async (req, res) => {
  const data = await Music.find();

  let payload = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  data.forEach((d) => {
    const createdAt = d.createdAt;
    const month = createdAt.getMonth();
    payload[month-1]+=1;
  });

  return res.json({
    payload:payload,
    status:true
  })
})
module.exports.GetTotalInfo = wrapAsync(async (req, res) => {
    const data = await Music.find();


    const uniqueAlbums = new Set(data.map(item => item.album.trim().toLowerCase()));

    const uniqueArtists = new Set(data.map(item => item.artist.trim().toLowerCase()));

    const uniqueGenre = new Set(data.map(item => item.genre.trim().toLowerCase()));
    

    

    const payload = {
        artist:uniqueArtists.size,
        album:uniqueAlbums.size,
        genre:uniqueGenre.size
    }

    return res.json({
        payload:payload,
        status:true
    })

})



module.exports.GetArtistInfo = wrapAsync(async (req, res) => {
  const data = await Music.find();
  // console.log(data);
  let artistData = {};
  data.forEach((d)=>{
    const artist = d.artist.trim().toLowerCase();
    if(artist in artistData){
      artistData[(artist)].push(d);
    }else{
      artistData[(artist)] = [d];
    }
  })

  for(const key in artistData){
    artistData[key] = artistData[key].length;
  }

  return res.json({
    payload:artistData,
    status:true
  })
})
