class Hotel {
    // Fetch hotels
    async getHotelList() {
        try {
            const hotelResponse = await axios.get(`http://localhost:8080/hotelbookingsystem/hotels`);

            const hotel = await hotelResponse.data;

            // console.log(hotel);
            // console.log(hotel[0].hotel_name);

            return hotel;
        } catch (error) {
            console.log(error);
        }
    }

    async addHotel(hotelData) {
        try {
            const response = await axios.post(`http://localhost:8080/hotelbookingsystem/hotels`,
                hotelData, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async editHotel(hotelData) {
        try {
            const response = await axios.put(`http://localhost:8080/hotelbookingsystem/hotels/${hotelData.hotel_id}`,
                hotelData, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
            console.log('Hotel.js hotel id: ',hotelData.hotel_id);
            return response;
        } catch (err) {
            console.log(err);
        }
    }
}