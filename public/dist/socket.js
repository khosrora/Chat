const socket = io("http://localhost:3000");

let nameSpaceSocket;

function stringToHtml(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body.firstChild
}

function getRoomInfo(roomName) {
    console.log(roomName);
    nameSpaceSocket.emit("joinRoom", roomName)
    nameSpaceSocket.on("room_info", roomInfo => {
        document.querySelector("#roomName h3").innerText = roomInfo.description;
    })
    nameSpaceSocket.on("online_users", count => {
        document.getElementById("count").innerText = count;
    })
}

function initNameSpaceConnection(endpoint) {
    if(nameSpaceSocket) nameSpaceSocket.close();
    nameSpaceSocket = io(`http://localhost:3000/${endpoint}`)
    nameSpaceSocket.on("connect", () => {
        nameSpaceSocket.on("room_list", rooms => {
            getRoomInfo(rooms[0].name)
            const roomsElement = document.querySelector('#contacts ul');
            roomsElement.innerHTML = ""
            for (const room of rooms) {
                const html = stringToHtml(`
                <li class="contact" roomName="${room.name}">
                <div class="wrap">
                    <img src="https://picsum.photos/200" height="40"/>
                    <div class="meta">
                        <p class="name">${room.name}</p>
                        <p class="preview" >${room.description}</p>
                    </div>
                </div>
                </li>
                `)
                roomsElement.appendChild(html);
                const roomNodes = document.querySelectorAll("ul li.contact");
                for (const roomNode of roomNodes) {
                    roomNode.addEventListener("click", () => {
                        const roomName = roomNode.getAttribute("roomName");
                        getRoomInfo(roomName);
                    })
                }

                document.querySelectorAll("#contact ul .contact").forEach(item => {
                    item.addEventListener('click', () => {
                        // document.getElementById("roomName").innerText =  
                    })
                })
            }
        })
    })
}


socket.on('connect', () => {
    socket.on("namespaces_list", namespaces => {
        const namespacesElement = document.getElementById("namespaces");
        namespacesElement.innerHTML = "";
        initNameSpaceConnection(namespaces[0].endpoint)
        for (const namespace of namespaces) {
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.setAttribute("class", "namespceTitle")
            p.setAttribute("endpoint", namespace.endpoint)
            p.innerText = namespace.name;
            li.appendChild(p);
            namespacesElement.appendChild(li)
        }
        const namespaceNodes = document.querySelectorAll("#namespaces li p.namespceTitle");

        for (const namespace of namespaceNodes) {
            namespace.addEventListener('click', () => {
                const endpoint = namespace.getAttribute('endpoint');
                initNameSpaceConnection(endpoint)
            })
        }
    })
})



