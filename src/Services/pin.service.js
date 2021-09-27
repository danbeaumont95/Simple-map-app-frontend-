import axios from "axios";

const getAllPins = async () => {
    const res = await axios.get('http://localhost:5001/api/pins');
    console.log(res, 'res in pin service get all pins')
    return res;
};

const postNewPin = async (newPin) => {
    console.log(newPin, 'new pin in service')
    const res = await axios.post('http://localhost:5001/api/pins', newPin
);
    console.log(res, 'res in pin service post new pin');
    return res;
}

export default {
    getAllPins,
    postNewPin
}