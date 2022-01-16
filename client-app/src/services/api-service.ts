import { ActivitiesApi, Activity } from "../api";

const $api = new ActivitiesApi();

const Activities = {
    list: () => $api.apiActivitiesGet().then(resp => resp.data),
    details: (id: string) => $api.apiActivitiesIdGet(id).then(resp => resp.data),
    create: (activity: Activity) => $api.apiActivitiesPost(activity).then(resp => resp.data),
    update: (id: string) => $api.apiActivitiesIdPut(id).then(resp => resp.data),
    delete: (id: string) => $api.apiActivitiesIdDelete(id).then(resp => resp.data),
}

const agent = {
    Activities
}

export default agent