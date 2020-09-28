const profile = {
  name: "정태웅",
  old: 26,
  gender: "men",
};

const otherProfile = {
  name: "홍언택",
  old: 16,
  gender: "men",
};

console.log(profile);

const { gender } = profile;

console.log(gender);

const { gender: gg } = otherProfile;

console.log(gg);

const student = {
  name: "jung",
  major: "컴공",
  teacher: {
    name: "kim",
    old: 42,
  },
};

console.log(student);

const {
  name,
  major,
  teacher: { name: teacherName, old },
} = student;

console.log(teacherName);

//Spread

const oddNum = [1, 3, 5, 7, 9];
const evenNum = [2, 4, 6, 8];

const num = [...oddNum, ...evenNum];

console.log(num);

//Rest
const { name: name2, ...rest } = student;

console.log(rest);
