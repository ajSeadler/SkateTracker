import React, { useEffect, useState } from "react";

const UserDataFetcher = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUserData(userData);

        // Fetch wishlist items
        const wishlistResponse = await fetch(
          `http://localhost:3000/api/users/${userData.id}/wishlist`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!wishlistResponse.ok) {
          throw new Error("Failed to fetch wishlist items");
        }

        const wishlistData = await wishlistResponse.json();
        setWishlistItems(wishlistData.wishlistItems);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return children({ userData, wishlistItems, loading, error });
};

export default UserDataFetcher;
