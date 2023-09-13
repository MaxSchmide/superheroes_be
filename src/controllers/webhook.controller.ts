import { Request, Response } from "express";
import { spawn } from "child_process";

const listen = async (req: Request, res: Response) => {
  const payload = req.body;

  if (payload && payload.ref === "refs/heads/master") {
    console.log("Received a push event to the master branch. Deploying...");
    const deployScriptPath = "/home/ec2-user/deploy.sh";
    const deployProcess = spawn("bash", [deployScriptPath]);
    deployProcess.stdout.on("data", (data) => {
      console.log(`Deployment script stdout: ${data}`);
    });
    deployProcess.stderr.on("data", (data) => {
      console.error(`Deployment script stderr: ${data}`);
    });
  }

  res.status(200).end();
};

export default {
  listen,
};
