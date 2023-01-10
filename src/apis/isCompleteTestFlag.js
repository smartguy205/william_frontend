export default function ({ testID, userID }) {
    return axios.post(`${process.env.REACT_APP_SERVER}/user/completeTest`,
        { testID, userID }
    );
}