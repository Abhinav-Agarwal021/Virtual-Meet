import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
})

//sends otp
export const sendOtp = (data) => api.post('/api/send-otp', data);

//verifies otp
export const verifyOtp = (data) => api.post('/api/verify-otp', data);

//activates user
export const activateUser = (data) => api.post('/api/activate-user', data);

//user logout
export const logout = () => api.post('/api/logout')

//user data using phone number
export const getUsBD = (data) => api.get('/api/userData', { params: { phone: data } });

//creates a room(dm or personal server)
export const createRoom = (data) => api.post('/api/rooms', data)

//update members of rooms
export const updateRoom = (data) => api.post('/api/updateRoom', data);

//get rooms using user id (user being the member of the rooms are fetched)
export const getRs = (id) => api.get(`/api/rooms/${id}`)

//rooms fetched using room id
export const getRId = (id) => api.get(`/api/room/${id}`)

//sends conversation list
export const sendCList = (data) => api.post('/api/chat', data);

//fetching conversations using user id
export const getCs = (data) => api.get(`/api/chat/${data}`)

//fetching conversations using conversation id
export const getCsBId = (data) => api.get(`/api/conv/${data}`);

//fetch users using user id
export const getUs = (id) => api.get(`/api/user/${id}`)

//get all messages using conv id
export const getMs = (id) => api.get(`/api/chats/${id}`);

//send messages
export const sendMssgs = (data) => api.post('/api/chats', data)

//creates category
export const sendCat = (data) => api.post('/api/grp/cat', data)

//create roles for user
export const sendRoles = (data) => api.post('/api/grp/role', data);

//create send channels
export const sendChannels = (data) => api.post('/api/grp/channels', data)

//get server data using room id
export const getRoom = (data) => api.get(`/api/grp/${data}`)

//getChannels dec using room id
export const getChannels = (data) => api.get(`/api/grp/channels/${data}`)

//send invite code in db
export const sendCode = (data) => api.post('/api/grp/codes', data);

//check code and add user to a server
export const verifyCode = (data) => api.post('/api/grp/invites', data);

//get user roles
export const UserRoles = (data) => api.post('/api/grp/roles', data);

//leave server
export const leaveServer = (data) => api.post('/api/grp/leave', data);


api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    "http://localhost:5000/api/refresh",
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);

            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);

export default api;