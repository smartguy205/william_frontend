import axios from 'axios';

export async function addPosition({ position }) {
    const res = await axios.post(`${process.env.REACT_APP_SERVER}/admin/position`, {
        position: position
    }, {
        headers: { "Content-Type": "application/json" }
    });

    if (res.status !== 200)
        return res

    else return { success: res.data?.success, msg: res.data?.msg }
}

export async function getAllPosition() {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/admin/position`);
    if (res.status !== 200)
        return res
    else if (res.data.success) {
        //console.log("hsd", res.data.findPositoin)
        return res.data.findPosition
    }
    else return res.data
}

export async function deletePosition(id) {
    const res = await axios.delete(`${process.env.REACT_APP_SERVER}/admin/position/${id}`);
    if (res.status !== 200)
        return res

    else return res.data
}