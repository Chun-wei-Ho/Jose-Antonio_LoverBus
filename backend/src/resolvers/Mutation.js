const Mutation = {
    async addMarker(parent, {marker}, {models, pubsub}, info){
        const _marker = new models.Marker({
            username: marker.username,
            properties:{
                title: marker.title,
                description: marker.description
            },
            geometry: {
                coordinates: marker.coordinates
            }
        })
        _marker.save()
        pubsub.publish(`marker.${_marker.username}`, {subscribeUser: {
            mutation: 'NEW', data: _marker
        }})
        return _marker._id
    },
    clearAll(parent, args, {models, pubsub}, info){
        // shouldn't be called, only for debugging
        Object.entries(models).map(([_,e]) => {
            e.deleteMany({}, () => {})
        })
    },
    async deleteMarker(parent, {_id}, {models, pubsub}, info){
        const marker = await models.Marker.findByIdAndDelete(_id, () => {})
        pubsub.publish(`marker.${marker.username}`, {subscribeUser: {
            mutation: 'DELETE', data: marker
        }})
    },
    async updateMarker(parent, {_id, newTitle, newDescription}, {models, pubsub}, info){ 
        const option = Object.fromEntries(
            Object.entries({"properties.title": newTitle,
             "properties.description": newDescription})
            .filter(([_, v]) => v != null));
        const marker = await models.Marker.findByIdAndUpdate({_id},
            option, () => {})
        pubsub.publish(`marker.${marker.username}`, {subscribeUser: {
            mutation: 'UPDATE', data: marker
        }})
    },
    newPlan(parent, args, {models, pubsub}, info){
        const plans = new models.Plan({...args, spotID: []})
        plans.save()
        return plans._id
    },
    renamePlan(parent, {_id, newTitle}, {models, pubsub}, info){
        models.Plan.findByIdAndUpdate({_id}, {title: newTitle}, () => {})
    },
    deletePlan(parent, {_id}, {models, pubsub}, info){
        models.Plan.findByIdAndDelete({_id}, ()=>{})
    },
    async signUp(parent, args, {models, pubsub}, info){
        const userquery = await models.User.find({username: args.username})
        if(userquery.length !== 0)
            throw "Error on creating user! User exists!"
        new models.User(args).save()
    },
    async newSpot(parent, {planID, markerID}, {models, pubsub}, info){
        const spot = new models.Spot({
            planID,
            markerID,
            startTime: new Date(1900,1,1,0,0,0),
            endTime: new Date(1900,1,1,0,0,0)
        })
        if( ! await models.Marker.findById(markerID)){
            throw "Error: Marker doesn't exist!!"
        }
        spot.save()
        models.Plan.findByIdAndUpdate({_id: planID}, {$push: {spotID: spot._id}}, () => {})
        return spot._id
    },
    async deleteSpot(parent, {_id}, {models, pubsub}, info){
        const spot = await models.Spot.findByIdAndDelete(_id, () => {})
        models.Plan.findByIdAndUpdate({_id: spot.planID}, {$pull: {"spotID": _id}}, () => {})
    },
    async updateSpotStartTime(parent, {_id, time}, {models, pubsub}, info){
        const date = new Date(time)
        models.Spot.findByIdAndUpdate({_id}, {startTime: date}, () => {})
    },
    async updateSpotEndTime(parent, {_id, time}, {models, pubsub}, info){
        const date = new Date(time)
        models.Spot.findByIdAndUpdate({_id}, {endTime: date}, () => {})
    }
}

module.exports = Mutation