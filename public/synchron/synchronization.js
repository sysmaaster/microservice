import * as fs from "fs";
import path from "path";

import { randomBytes } from 'crypto'

function readFile(file) {
  return fs.readFileSync(file, "utf8", (err, d) => {
    if (err) throw err;
    return d;
  });
}
const getFiles = (dir, files_) => {
  files_ = files_ || [];
  let files = fs.readdirSync(dir);
  for (let i in files) {
    let name = path.join(dir, files[i]);
    let data = {};
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      const statData = fs.statSync(name);
      const statData2 = path.parse(name);

      data = {
        src: path.join(statData2.dir, statData2.base),
        srcLoc: path.join(statData2.dir, statData2.base),
        dir: statData2.dir || "",
        base: statData2.base || "",
        ext: statData2.ext || "",
        name: statData2.name || "",
        size: statData.size || "",
        times: {
          mtime: statData.mtime || "",
          atime: statData.atime || "",
          ctime: statData.ctime || "",
        },
      };
      files_.push(data);
    }
  }
  return files_;
};
const add = (a, b) => {
  if (b.length >= 0) {
    for (let index = 0; index < b.length; index++) {
      const element = b[index];
      a.push({ base: element.base, src: element.src });
    }
  }
};
let results = {
  a1: [], //нові диск 1
  a2: [], //нові диск 2
  s1: [], //однаковий розмір
  ident_count: 0,
  all_count: 0,
  new_1_count: 0, //кількість нові диск 1
  new_2_count: 0, //кількість нові диск 1
};
const goView = (path1, path2) => {
  const ar1 = getFiles(path1, undefined);
  const ar2 = getFiles(path2, undefined);
  const is1 = ar1.length;
  let step = 0;

  for (var i = ar1.length - 1; i >= 0; i--) {
    let find = false;
    step++;

    for (var i2 = ar2.length - 1; i2 >= 0; i2--) {
      if (ar1[i].base === ar2[i2].base) {
        ar2.splice(i2, 1);
        results.ident_count++;
        find = true;
        break;
      }
    }

    if (find) {
      ar1.splice(i, 1);
    } else {
      results.new_1_count++;
    }

    console.log({ on: ar2.length, step, ETA: (step / is1) * 100 });
    results.all_count++;
  }

  add(results.a1, ar1);
  add(results.a2, ar2);

  results.new_2_count = ar2.length;

  fs.writeFileSync("result.json", JSON.stringify(results), (err) => {
    if (err) throw err;
    console.log("Data has been add on result.json!");
  });

  console.log(results);
};
const copyFile = (dat, prefix) => {
  let count = 0;
  let a = 0;
  let length = dat.length;
  for (let i = 0; i < dat.length; i++) {
    try {
      count++;
      a = (count / length) * 100;
      console.log("step: " + count + " " + a);
      const element = dat[i];
      fs.copyFileSync(
        element.src,
        `D:\\apendFilleSrever\\${randomBytes(6).toString("hex")}${element.ext}`
      );
    } catch (error) {
      console.log(error);
    }
  }
  console.log(dat.length + " = all " + prefix);
};
const unlinkFile = (dat, prefix) => {
  try {
    let count = 0;
    for (let i = 0; i < dat.length; i++) {
      count++;
      console.log("unlink step: " + count);
      const element = dat[i];
      fs.unlinkSync(element.src);
    }
    console.log(dat.length + " = all unlink " + prefix);
  } catch (error) {
    console.log(error);
  }
};
const ivent = (path1, names) => {
  const get = getFiles(path1, undefined);
  fs.writeFileSync(`${names}.json`, JSON.stringify(get), (err) => {
    if (err) throw err;
    console.log(`Data add ${names}.json!`);
  });
};
/*
goView("D:\\Архів Фото 06,08\\photo_arh", "E:\\Архів Фото 06,08\\photo_arh");
const result = JSON.parse(readFile("d-ssd1.json"));
copyFile(result, "a1");
copyFile(result.a2, "a2")
//0unlinkFile(result.a1, "a1")
//0unlinkFile(result.a2, "a2")*/
//ivent("D:\\Архів Фото 06,08\\photo_arh", "d-ssd1")
