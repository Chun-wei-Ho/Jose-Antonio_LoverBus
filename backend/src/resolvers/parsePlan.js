async function parsePlan(plan){
    function compare( a, b ) {
      if ( a.endTime < b.endTime ){
        return -1;
      }
      if ( a.endTime > b.endTime ){
        return 1;
      }
      return 0;
    }
    const models = this.models
    let spots = await models.Spot.find().where('_id').in(plan.spotID).sort({'endTime':1}).exec()
    spots = await Promise.all(spots.map(async e =>{
        const marker = await models.Marker.findById(e.markerID)
        return {
            startTime: e.startTime.toString(),
            endTime: e.endTime.toString(),
            location: marker,
            _id: e._id
        }
    }))
    return {username:plan.username, title: plan.title, _id: plan._id, spots:spots.sort(compare)}
}

module.exports = parsePlan