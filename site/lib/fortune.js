var fortuneCookies = ["The future of scalable data processing is microservices!",
    "Foundry, Apache Mesos and Apache YARN.",
    "We have a parent pom that has dependency management for Reactor (2.0.7).",
    "It is a reasonable thing to want to do this, but it should be done with caution.",
    "Reactor as an example of such a dependency because it is nearing a major new release.",
    "During this webinar you’ll see an overview of Spring Cloud Data Flow.",
    "Spring Cloud Data Flow is an integrated orchestration layer."
];

module.exports.getFortune = function getFortune() {
    return fortuneCookies[Math.floor(Math.random()*fortuneCookies.length)];
};