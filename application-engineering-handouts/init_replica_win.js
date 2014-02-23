config = { _id: "replica_set", members:[
          { _id : 0, host : "localhost:30001"},
          { _id : 1, host : "localhost:30002"},
          { _id : 2, host : "localhost:30003"} ]
};
rs.initiate(config);
rs.status();