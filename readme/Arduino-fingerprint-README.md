# Arduino 指纹门禁

> 基于 Arduino 的指纹识别门禁系统，硬件与软件结合的物联网入门项目。

## 硬件清单

| 元件 | 型号 |
|------|------|
| 主控板 | Arduino UNO R3 |
| 指纹模块 | AS608 光学指纹传感器 |
| 继电器 | 5V 单路继电器模块 |
| 电磁锁 | 12V 电磁锁 |
| 显示屏 | 0.96寸 OLED (SSD1306) |
| 按钮 | 自复位按钮 ×2 |

## 工作流程

1. **录入指纹** — 按下录入按钮，将手指放在传感器上完成指纹采集
2. **验证指纹** — 按下识别按钮，手指放在传感器上比对指纹库
3. **开锁** — 验证成功后继电器吸合，电磁锁通电开锁
4. **状态显示** — OLED 屏幕实时显示操作状态和提示信息

## 核心代码

```cpp
// 指纹验证主逻辑
if (finger.getImage() == FINGERPRINT_OK) {
  finger.image2Tz(1);
  int result = finger.fingerSearch();
  if (result == FINGERPRINT_OK) {
    digitalWrite(relayPin, HIGH);  // 开锁
    delay(3000);                    // 保持3秒
    digitalWrite(relayPin, LOW);   // 关锁
  }
}
```

## 接线说明

详见仓库中的 `schematics/` 目录，包含接线图和实物照片。

## 所需库

- Adafruit Fingerprint Sensor Library
- Adafruit SSD1306
- Adafruit GFX Library

## License

MIT
