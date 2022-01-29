// WORD
//
// Converted from BASIC to Javascript by Oscar Toledo G. (nanochess)
//

function print(str)
{
    document.getElementById("output").appendChild(document.createTextNode(str));
}

function input()
{

    return new Promise(function (resolve) {
                       const input_element = document.createElement("INPUT");

                       print("? ");
                       input_element.setAttribute("type", "text");
                       input_element.setAttribute("length", "50");
                       document.getElementById("output").appendChild(input_element);
                       input_element.focus();
                       input_element.addEventListener("keydown", function (event) {
                                                      if (event.keyCode === 13) {
                                                          const input_str = input_element.value;
                                                          document.getElementById("output").removeChild(input_element);
                                                          print(input_str);
                                                          print("\n");
                                                          resolve(input_str);
                                                      }
                                                      });
                       });
}

function tab(space)
{
    let str = "";
    while (space-- > 0)
        str += " ";
    return str;
}

const words = ["DINKY", "SMOKE", "WATER", "GLASS", "TRAIN",
             "MIGHT", "FIRST", "CANDY", "CHAMP", "WOULD",
             "CLUMP", "DOPEY"];

const s = [];
const a = [];
const l = [];
const d = [];
const p = [];

// Main control section
async function main()
{
    print(tab(33) + "WORD\n");
    print(tab(15) + "CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY\n");
    print("\n");
    print("\n");
    print("\n");
    print("I AM THINKING OF A WORD -- YOU GUESS IT.  I WILL GIVE YOU\n");
    print("CLUES TO HELP YOU GET IT.  GOOD LUCK!!\n");
    print("\n");
    print("\n");
    while (1) {
        print("\n");
        print("\n");
        print("YOU ARE STARTING A NEW GAME...\n");
        let n = words.length;
        let ss = words[Math.floor(Math.random() * n)];
        let g = 0;
        s[0] = ss.length;
        for (let i = 1; i <= ss.length; i++)
            s[i] = ss.charCodeAt(i - 1);
        for (let i = 1; i <= 5; i++)
            a[i] = 45;
        for (let j = 1; j <= 5; j++)
            p[j] = 0;
        let ls = undefined;
        while (1) {
            print("GUESS A FIVE LETTER WORD");
            ls = (await input()).toUpperCase();
            g++;
            if (ss === ls)
                break;
            for (let i = 1; i <= 7; i++)
                p[i] = 0;
            l[0] = ls.length;
            for (let i = 1; i <= ls.length; i++) {
                l[i] = ls.charCodeAt(i - 1);
            }
            if (l[1] === 63) {
                print("THE SECRET WORD IS " + ss + "\n");
                print("\n");
                break;
            }
            if (l[0] !== 5) {
                print("YOU MUST GUESS A 5 LETTER WORD.  START AGAIN.\n");
                print("\n");
                g--;
                continue;
            }
            let m = 0;
            let q = 1;
            for (let i = 1; i <= 5; i++) {
                for (let j = 1; j <= 5; j++) {
                    if (s[i] === l[j]) {
                        p[q] = l[j];
                        q++;
                        if (i === j)
                            a[j] = l[j];
                        m++;
                    }
                }
            }
            a[0] = 5;
            p[0] = m;
            let as = "";
            for (let i = 1; i <= a[0]; i++)
                as += String.fromCharCode(a[i]);
            let ps = "";
            for (let i = 1; i <= p[0]; i++)
                ps += String.fromCharCode(p[i]);
            print("THERE WERE " + m + " MATCHES AND THE COMMON LETTERS WERE... " + ps + "\n");
            print("FROM THE EXACT LETTER MATCHES, YOU KNOW............ " + as + "\n");
            if (as === ss) {
                ls = as;
                break;
            }
            if (m <= 1) {
                print("\n");
                print("IF YOU GIVE UP, TYPE '?' FOR YOUR NEXT GUESS.\n");
                print("\n");
            }
        }
        if (ss === ls) {
            print("YOU HAVE GUESSED THE WORD.  IT TOOK " + g + " GUESSES!\n");
            print("\n");
        } else {
            continue;
        }
        print("WANT TO PLAY AGAIN");
        let qs = (await input()).toUpperCase();
        if (qs !== "YES")
            break;
    }
}

main();
