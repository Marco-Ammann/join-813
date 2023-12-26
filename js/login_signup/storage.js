
const STORAGE_TOKEN = 'XED82JI0UQVPAW7GK0HYNZEI6ORUXO9SL3KVY824';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

/**
 * Make the Array empty = []; key = 'users'; key = 'currentUser';
 * 
 */
// async function deleteItem(key){
//     await setItem("key", []);
// }







/**
 * Retrieves the tasks array from the backend storage and parses it.
 * If the tasks data is not found or is in an invalid format, it returns an empty array.
 * 
 * @async
 * @function getTasksArray
 * @returns {Promise<Array>} An array containing the tasks data.
 * @throws {Error} Throws an error if there is an issue while loading the tasks.
 */
async function getTasksArray() {
    try {
        const tasksData = await getItem('tasks');
        if (Array.isArray(tasksData)) {
            return tasksData;
        } else if (typeof tasksData === 'string') {
            return JSON.parse(tasksData);
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error while loading tasks: ', error);
        return [];
    }
}