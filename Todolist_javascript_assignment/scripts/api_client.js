const baseUrl = "http://localhost:3000/";

// GET
export const getData = async function(){
    try {
        const response = await fetch (baseUrl, {
            headers: {
                "Content-Type": "application/json",
            }, 
        });
        const data = await response.json();
        return(data);
    } catch (error) {
        console.log(error);
    };
};

// POST
export const postData = async function(value){
    try{
        const data = {description: value, done: false};
        await fetch(baseUrl, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          },
        });
        return data;
    } catch(error){
        console.log(error);
    };
};

// PUT
export const putData = async function(description, id){
    try{
        const data = {description: description, done: false};
        await fetch(baseUrl + id, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          },
        });
        return data;
    } catch(error){
        console.log(error);
    };
};

// DELETE
export const deleteData = async function(id){
    try{
        const data = {id};
        await fetch(baseUrl + id, {
          method: "DELETE",
          body: JSON.stringify(data),
        });
        return data;
    } catch(error){
        console.log(error);
    };
};