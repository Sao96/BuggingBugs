const a = {
    pfp: "https://i.imgur.com/lbrVhd3.png",
    author: "Scott Combs",
    priority: 0,
    status: 1,
    duedate: "5/20",
    headline:
        "Strings sent to website end up being corrupted when displayed afterward. Text too close to borders.",
};
const b = {
    pfp:
        "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
    author: "Andrew Williams",
    priority: 1,
    status: 1,
    duedate: "5/21",
    headline:
        "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
};

const c = {
    pfp: "https://i.imgur.com/poZr1ed.png",
    author: "James Jones",
    priority: 2,
    status: 1,
    duedate: "5/24",
    headline:
        "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
};

const d = {
    pfp: "https://i.imgur.com/aIBs6cj.png",
    author: "Michael Toms",
    priority: 3,
    status: 1,
    duedate: "5/25",
    headline:
        "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
};

const premade = [
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/lbrVhd3.png",
        author: "Scott Combs",
        priority: 0,
        status: 1,
        duedate: "5/20",
        headline:
            "Strings sent to website end up being corrupted when displayed afterward. Text too close to borders.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/lbrVhd3.png",
        author: "Scott Combs",
        priority: 0,
        status: 1,
        duedate: "5/20",
        headline:
            "Strings sent to website end up being corrupted when displayed afterward. Text too close to borders.",
    },
    {
        pfp: "https://i.imgur.com/lbrVhd3.png",
        author: "Scott Combs",
        priority: 0,
        status: 1,
        duedate: "5/20",
        headline:
            "Strings sent to website end up being corrupted when displayed afterward. Text too close to borders.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/lbrVhd3.png",
        author: "Scott Combs",
        priority: 0,
        status: 1,
        duedate: "5/20",
        headline:
            "Strings sent to website end up being corrupted when displayed afterward. Text too close to borders.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/lbrVhd3.png",
        author: "Scott Combs",
        priority: 0,
        status: 1,
        duedate: "5/20",
        headline:
            "Strings sent to website end up being corrupted when displayed afterward. Text too close to borders.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/lbrVhd3.png",
        author: "Scott Combs",
        priority: 0,
        status: 1,
        duedate: "5/20",
        headline:
            "Strings sent to website end up being corrupted when displayed afterward. Text too close to borders.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/lbrVhd3.png",
        author: "Scott Combs",
        priority: 0,
        status: 1,
        duedate: "5/20",
        headline:
            "Strings sent to website end up being corrupted when displayed afterward. Text too close to borders.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/lbrVhd3.png",
        author: "Scott Combs",
        priority: 0,
        status: 1,
        duedate: "5/20",
        headline:
            "Strings sent to website end up being corrupted when displayed afterward. Text too close to borders.",
    },
    {
        pfp: "https://i.imgur.com/aIBs6cj.png",
        author: "Michael Toms",
        priority: 3,
        status: 1,
        duedate: "5/25",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp: "https://i.imgur.com/poZr1ed.png",
        author: "James Jones",
        priority: 2,
        status: 1,
        duedate: "5/24",
        headline:
            "Display photos on the home feed get mixed with other users, homepage displays random photo's from the internet.",
    },
    {
        pfp:
            "https://i.pinimg.com/474x/a9/54/78/a95478bbf2d5520fae91a9b95e321122.jpg",
        author: "Andrew Williams",
        priority: 1,
        status: 1,
        duedate: "5/21",
        headline:
            "Vanguard system causes the entire system to enter a deadlock state. Harddrive must be formatted for system to run back on.",
    },
    {
        pfp: "https://i.imgur.com/lbrVhd3.png",
        author: "Scott Combs",
        priority: 0,
        status: 1,
        duedate: "5/20",
        headline:
            "Strings sent to website end up being corrupted when displayed afterward. Text too close to borders.",
    },
];
export { a, b, c, d, premade };
