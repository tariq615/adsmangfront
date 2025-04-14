import conf from "../conf/conf"
import axios from "axios";

export class UserAuthService {
//   async createAccount(userData) {
//     try {
//       const registeredUser = await axios.post(
//         `${conf.base_url}/users/register`,
//         userData
//       );
//       return registeredUser;
//     } catch (error) {
//       if (error.response) {
//         const errorMessages = error.response.data.errors.map(err => err.msg); 
//         console.error("Server Errors:", errorMessages);
//         throw errorMessages;
//       } else {
//         console.error("Unexpected Error:", error.message);
//       }
//     }
//   }

  async login(userData) {
    // console.log(userData);
    
    try {
      const loginUser = await axios.post(
        `${conf.base_url}/admin/login`,
        userData
      );
      return loginUser;
    } catch (error) {
      console.error(error)
    }
  }

  async postBlog(blogData, token) {
    try {
      const blogPost = await axios.post(
        `${conf.base_url}/admin/post`,
        blogData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(blogPost);
      
      return  blogPost;
    }
    catch (error) {

      console.error(error)
    }
  }

  async getStats (token) {
    try {
      const stats = await axios.post(`${conf.base_url}/admin/dashboardstats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return stats
    } catch (error) {
      console.error(error)
    }
  }
//   async getCurrentUser(token) {
//     try {
//       const profile = await axios.get(`${conf.base_url}/users/get-profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return profile;
//     } catch (error) {
//       if (error.response) {
//         console.error("Server Error:", error);
//       } else {
//         console.error("Unexpected Error:", error.message);
//       }
//       throw error.response.data;
//     }
//   }

//   async logout(token) {
//     try {
//       const logout = await axios.get(`${conf.base_url}/users/logout`,{
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       return logout;
//     } catch (error) {
//       if (error.response) {
//         console.error("Server Error:", error);
//       } else {
//         console.error("Unexpected Error:", error.message);
//       }
//       throw error.response.data;
//     }
//   }
}

const userAuthService = new UserAuthService();

export default userAuthService;
