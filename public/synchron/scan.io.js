const e = require("cors");
var fs = require("fs");
var path = require("path");

const isDirectory = (pathToDir) => {
  if (fs.existsSync(pathToDir)) {
    return true;
  } else {
    return false;
  }
};

/**  Создание нового файла
 *   r: открыть файл для чтения
 *   r+: открыть файл для чтения и записи
 *   rs: открыть файл для чтения в синхронном режиме
 *   w: открыть файл для записи
 *   a: открыть файл для записи данных в конец файла
 *   a+: открыть файл для чтения и для записи данных в конец файла
 */
function fileopen(file, arg) {
  fs.openSync(file, arg, (err) => {
    if (err) throw err;
    console.log("File created");
  });
}

/**Запись данных в файл - дописать */
function appendFile(file, data) {
  fs.appendFile(file, data, (err) => {
    if (err) throw err;
    console.log("Data has been added!");
  });
}

/* Запись данных в файл - замена*/
function writeFile(file, data) {
  fs.writeFile(file, data, (err) => {
    if (err) throw err;
    console.log("Data has been replaced!");
  });
}
/* Чтение файла */
function readFile(file) {
  return fs.readFileSync(file, "utf8", (err, d) => {
    if (err) throw err;
    /*
    console.log("--------- [File Data] ---------");
    console.log(data);
    console.log("--------- [File Data] ---------");*/
    return d;
  });
}

/* Переименование файла */
function fileHandler(File, newFile) {
  fs.rename(File, newFile, (err) => {
    if (err) throw err;
    console.log("File renamed successfully!");
  });
}

/*Удаление файла*/
function unlink() {
  fs.unlink("newTestFile.txt", (err) => {
    if (err) throw err;
    console.log("File deleted successfully!");
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
        uid: "rand",
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
/*
fileopen(e1, "w")
fileopen(e2, "w")

const de1 = getFiles(p1);
const es1 = JSON.stringify(de1);
writeFile(e1, es1);
const de2 = getFiles(p2);
const es2 = JSON.stringify(de2);
writeFile(e2, es2);

fileopen("ssd.json", "w")
const dat = JSON.stringify(getFiles("D:\Архів Фото 06,08"));
writeFile("ssd.json", dat);
console.log(dat.length + "   >ssd2");*/ /*
console.log(dS2c.length + "   >s2c");*/

//const p1 = "E:\\Архів Фото 06,08";
///const p2 = "E:\\2Архів Фото 06,08";
//const s2 = readFile("File2.json");
//const s2c = readFile("File2copy.json");
//const t1 = readFile("testFile.json");
//const e1 = "E-File1.json";

//const dS2 = ([] = JSON.parse(s2)); //  61   >s2
//const dS2c = ([] = JSON.parse(s2c)); //39   >s2c

//const dT1 = ([] = JSON.parse(t1)); //4140 >t1
//const pE1 = ([] = JSON.parse(readFile("")));
//const ssd = ([] = JSON.parse(readFile("ssd.json")));
//const pE2 = ([] = JSON.parse(readFile("E-File1.json")));

function foRe(ar1, ar2) {
  let is1 = ar1.length;
  let iss2 = 0;
  let is2 = 0;
  let results = {
    a1: [], //нові диск 1
    a2: [], //нові диск 2
    s1: [], //однаковий розмір
    ident_count: 0,
    all_count: 0,
    size_count: 0,
    new_1_count: 0, //кількість нові диск 1
    new_2_count: 0, //кількість нові диск 1
  };
  for (var i = ar1.length - 1; i >= 0; i--) {
    let find = false;
    is2++;

    const size1 = ar1[i].size;
    const base1 = ar1[i].base;

    for (var i2 = ar2.length - 1; i2 >= 0; i2--) {
      iss2++;
      const size2 = ar2[i2].size;
      const base2 = ar2[i2].base;
      console.log({
        iss2,
        on: ar2.length,
        find: results.ident_count,
        step: is2,
        ETA: (is2 / is1) * 100,
      });

      if (size1 == size2) {
        if (base1 != base2) {
          results.size_count++;
          results.s1.push({
            size1,
            size2,
            src1: ar1[i].src,
            src2: ar2[i2].src,
          });
        }
      }
      if ((size1 === size2) & (base1 === base2)) {
        results.ident_count++;
        ar2.splice(i2, 1);
        find = true;
        break;
      }
    }

    if (find) {
      ar1.splice(i, 1);
    } else {
      results.new_1_count++;
    }

    results.all_count++;
  }
  results.a1 = ar1;
  results.a2 = ar2;
  results.new_2_count = ar2.length;
  fileopen("result.json", "w");
  writeFile("result.json", JSON.stringify(results));
  return results;
}
//console.log(foRe( ssd, pE2));
