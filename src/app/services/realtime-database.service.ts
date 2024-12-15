// // src/app/realtime-database.service.ts
// import { Injectable } from '@angular/core';
// import { getDatabase, ref, get } from 'firebase/database';

// @Injectable({
//   providedIn: 'root',
// })
// export class RealtimeDatabaseService {
//   private db = getDatabase(); // Get the Firebase Database instance

//   constructor() {}

//   // Method to fetch items from a specific path in the database
//   getItems(path: string): Promise<any> {
//     const dbRef = ref(this.db, path); // Create a reference at the specified path
//     return get(dbRef) // Use get() to retrieve data
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           return snapshot.val(); // Return the value if it exists
//         } else {
//           console.log('No data available');
//           return null;
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         throw error;
//       });
//   }
// }
