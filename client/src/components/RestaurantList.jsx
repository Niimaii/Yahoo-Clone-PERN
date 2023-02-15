import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  // This is "history"
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`${id}`);
      setRestaurants(
        // Only add elements.id in the new array that DOES NOT match the id of the element we just delted. If it does match then it's not included in the new Array.
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
      console.log(restaurants);
    } catch (err) {}
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    // If there is no reviews, render this
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.id} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

  return (
    <div>
      <div className=" list-group">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="table-primary">
              <th scope="col">Restaurant</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Ratings</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* This will only run if restaurants exists */}
            {restaurants &&
              restaurants.map((restaurant) => {
                return (
                  <tr
                    onClick={() => handleRestaurantSelect(restaurant.id)}
                    key={restaurant.id}
                  >
                    <td className="rest_btn">{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{"$".repeat(restaurant.price_range)}</td>
                    <td>{renderRating(restaurant)}</td>
                    <td>
                      <button
                        onClick={(e) => handleUpdate(e, restaurant.id)}
                        className="btn btn-warning"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e) => handleDelete(e, restaurant.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            {/* <tr>
              <td>McDonalds</td>
              <td>New York</td>
              <td>$$</td>
              <td>Rating</td>
              <td>
                <button className="btn btn-warning">Update</button>
              </td>
              <td>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantList;
