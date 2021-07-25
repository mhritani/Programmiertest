import express, { json } from "express";
import cors from "cors";
import { join } from "path";
import cookieParser from "cookie-parser";
import { fromjwt, tojwt } from "./jwt";

const app = express();
app.use(json());
app.use(cors({ origin: "*" }));
app.use("/public", express.static("public"));
app.use(cookieParser());
app.post("/games", (request, response) => {
    const { tuer } = request.body;
    const { tries = 0, win, random } = fromjwt(request.cookies.status);
    if (win) {
        return response.send({ success: 1, win, rand: random, tries, info: "Du bist der beste!" });
    }
    if (tries >= 2) {
        return response.send({ success: 1, win, rand: random, tries, info: "ist schon vorbei!" });
    }
    if (!tuer) {
        return response.send({ success: 0 });
    }
    const rand = random || Math.floor(Math.random() * 3) + 1;
    const newWin = rand === parseInt(tuer, 10);
    const newTries = tries + 1;
    return response
        .cookie(
            "status",
            tojwt({
                tries: newTries,
                win: newWin,
                random: rand,
            })
        )
        .send({ success: 1, win: newWin, tries: newTries, ...(true ? { rand } : {}) });
});
app.get("/", (_request, response) => {
    response.sendFile(join(__dirname, "public", "index.html"));
});

app.listen(8001, () => {
    console.log("ist gestartet");
});
