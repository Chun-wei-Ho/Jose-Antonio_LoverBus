const parsePlan = require('./parsePlan')
const Mutation = {
    addMarker(parent, {marker}, {models, pubsub}, info){
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
        pubsub.publish(`marker.${_marker.username}`, {subscribeMarker: {
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
        const marker = await models.Marker.findById(_id, () => {})
        models.Marker.findByIdAndDelete(_id, () => {})
        const spots = await models.Spot.find({markerID:_id})
        pubsub.publish(`marker.${marker.username}`, {subscribeMarker: {
            mutation: 'DELETE', data: marker
        }})

        spots.map(async ({planID,_id})=>{
            const plan = await models.Plan.findByIdAndUpdate({_id: planID}, {$pull: {"spotID": _id}}, () => {})

            const parsedPlan = await parsePlan.bind({models})(plan)
            pubsub.publish(`plan.${parsedPlan.username}`, {subscribePlan: {
                    mutation: 'UPDATE', data: {title:parsedPlan.title, spots:parsedPlan.spots, _id: plan._id} 
            }})
            models.Spot.findByIdAndDelete(_id, () => {})
        })
    },
    async updateMarker(parent, {_id, newTitle, newDescription}, {models, pubsub}, info){ 
        const option = Object.fromEntries(
            Object.entries({"properties.title": newTitle,
             "properties.description": newDescription})
            .filter(([_, v]) => v != null));
        const marker = await models.Marker.findByIdAndUpdate({_id},
            option, () => {})
        pubsub.publish(`marker.${marker.username}`, {subscribeMarker: {
            mutation: 'UPDATE', data: marker
        }})
    },
    async newPlan(parent, args, {models, pubsub}, info){
        const plan = await new models.Plan({...args, spotID: []}).save()
        pubsub.publish(`plan.${args.username}`, {subscribePlan: {
            mutation: 'NEW', data: {...args, _id: plan._id, spots:[], }
        }})
        return plan._id
    },
    renamePlan(parent, {_id, newTitle}, {models, pubsub}, info){
        models.Plan.findByIdAndUpdate({_id}, {title: newTitle}, () => {})
    },
    async deletePlan(parent, {_id}, {models, pubsub}, info){
        const plan = await models.Plan.findById(_id)
        plan.spotID.map(e=>{
            models.Spot.findByIdAndDelete(e, () => {})
        })
        models.Plan.findByIdAndDelete(_id, ()=>{})
        pubsub.publish(`plan.${plan.username}`, {subscribePlan: {
            mutation: 'DELETE', data: {_id: plan._id} 
        }})
    },
    async signUp(parent, args, {models, pubsub}, info){
        if(args.username === "")
            throw "username cannot be empty"
        if(args.password === "")
            throw "password cannot be empty"
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
        const plan = await models.Plan.findByIdAndUpdate({_id: planID}, {$push: {spotID: spot._id}}, () => {})
        if(plan){
            await spot.save()
            const parsedPlan = await parsePlan.bind({models})(plan)
            pubsub.publish(`plan.${parsedPlan.username}`, {subscribePlan: {
                mutation: 'UPDATE', data: {username: parsedPlan.username, title:parsedPlan.title, spots:parsedPlan.spots, _id: plan._id} 
            }})
        }
        return spot._id
    },
    async deleteSpot(parent, {_id}, {models, pubsub}, info){
        const spot = await models.Spot.findById(_id)
        models.Spot.findByIdAndDelete(_id, () => {})
        const plan = await models.Plan.findByIdAndUpdate({_id: spot.planID}, {$pull: {"spotID": _id}}, () => {})

        const parsedPlan = await parsePlan.bind({models})(plan)
        pubsub.publish(`plan.${parsedPlan.username}`, {subscribePlan: {
                mutation: 'UPDATE', data: {title:parsedPlan.title, spots:parsedPlan.spots, _id: plan._id} 
        }})
    },
    async updateSpotStartTime(parent, {_id, time}, {models, pubsub}, info){
        const date = new Date(time)
        const spot = await models.Spot.findByIdAndUpdate({_id}, {startTime: date}, () => {})
        const plan = await models.Plan.findById({_id: spot.planID})

        const parsedPlan = await parsePlan.bind({models})(plan)
        pubsub.publish(`plan.${parsedPlan.username}`, {subscribePlan: {
                mutation: 'UPDATE', data: {title:parsedPlan.title, spots:parsedPlan.spots, _id: plan._id} 
        }})
    },
    async updateSpotEndTime(parent, {_id, time}, {models, pubsub}, info){
        const date = new Date(time)
        const spot = await models.Spot.findByIdAndUpdate({_id}, {endTime: date}, () => {})
        const plan = await models.Plan.findById({_id: spot.planID})

        const parsedPlan = await parsePlan.bind({models})(plan)
        pubsub.publish(`plan.${parsedPlan.username}`, {subscribePlan: {
                mutation: 'UPDATE', data: {title:parsedPlan.title, spots:parsedPlan.spots, _id: plan._id} 
        }})
    }
}

module.exports = Mutation