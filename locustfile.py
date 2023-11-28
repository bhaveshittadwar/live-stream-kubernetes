from locust import HttpUser, task, between

class MyUser(HttpUser):
    host = "http://127.0.0.1:52839"
    wait_time = between(1, 5)  

    @task
    def make_requests(self):
        payload = {
            "name": "John Doe",
            "age": 30,
            "email": "johndoe@example.com"
        }

        headers = {
            "Content-Type": "application/json"
        }
        response = self.client.post("/insertDocument", json=payload, headers=headers)
        if response.status_code == 201:
            # Success! Log successful response
            print(f"Request successful: {response.status_code}")
        else:
            print(f"Request failed with status code: {response.status_code}")
        

MyUser.users = 100 
MyUser.spawn_rate = 10