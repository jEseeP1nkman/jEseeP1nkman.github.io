function Admin_Hexo_S() {
    const { spawn } = require('child_process');
    
    // 定义命令和路径
    const cmd = 'hexo';
    const args = ['s'];
    const cwdPath = 'E:\\Hexo';
    
    console.log(`正在目录 ${cwdPath} 下启动 Hexo 服务...`);
    
    // 使用 spawn 开启子进程，并保持控制台颜色输出
    const hexoProcess = spawn('cmd.exe', ['/c', 'hexo', 's'], {
      cwd: cwdPath,
      shell: true,
      stdio: 'inherit' // 这行很关键，它会让 Hexo 的输出直接显示在当前的 CMD 窗口里
    });
    
    hexoProcess.on('error', (err) => {
      console.error('启动失败:', err);
    });
    
    hexoProcess.on('exit', (code) => {
      console.log(`Hexo 进程已退出，退出码: ${code}`);
    });
}
