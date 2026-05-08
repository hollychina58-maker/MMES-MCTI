---
slug: imu-fundamentals
title: "IMU Fundamentals: How Accelerometers and Gyroscopes Work"
excerpt: "An in-depth exploration of Inertial Measurement Units covering accelerometer and gyroscope principles, key performance parameters, and sensor fusion algorithms."
content: |
  # IMU Fundamentals: How Accelerometers and Gyroscopes Work

  ## Abstract

  Inertial Measurement Units (IMUs) are the core sensing components of modern navigation and motion control systems. From smartphone screen rotation to precision agricultural drone spraying to rocket attitude control, IMUs are everywhere. This article provides an in-depth analysis of the core components of IMUs—accelerometers and gyroscopes—explaining their working mechanisms, the physical significance of key performance parameters, and how sensor fusion algorithms transform "raw noisy data" into "precise attitude information."

  ---

  ## 1. Overview: The Birth of a Precision System

  Before discussing specific principles, we need to understand where IMUs fit in systems.

  A complete inertial navigation system typically contains three layers:

  | Layer | Sensors | Output |
  |-------|---------|--------|
  | Sensing Layer | Accelerometer + Gyroscope | Raw physical quantities (acceleration, angular velocity) |
  | Fusion Layer | Sensor fusion algorithms | Attitude quaternions/Euler angles |
  | Navigation Layer | Inertial navigation algorithms | Position, velocity, heading |

  This article focuses on the **Sensing Layer**—the working mechanisms of accelerometers and gyroscopes themselves.

  **An important fact**: Accelerometers and gyroscopes can each only provide incomplete information. Accelerometers can sense tilt angle from gravity direction under static conditions, but once the carrier has motion acceleration, tilt measurement immediately fails. Gyroscopes can precisely track attitude changes but suffer from time drift. The true power of IMUs lies in fusing both—covered in Section 4.

  ---

  ## 2. Accelerometers: Sensing "Force" Not "Motion"

  ### 2.1 A Counterintuitive Fact

  Many people believe accelerometers measure changes in velocity. But in reality, accelerometers measure **acceleration resulting from force**—more precisely, **acceleration relative to free fall**, which engineers call "proper acceleration" or "specific force."

  If you hold an accelerometer and free fall, you'll find the reading is zero—despite your acceleration. This is because inside an accelerometer is a **floating mass** that measures how much a spring is stretched or compressed, not your velocity of motion.

  ### 2.2 How MEMS Accelerometers Work

  The core structure of modern MEMS (Micro-Electro-Mechanical Systems) accelerometers is exquisitely designed:

  ```
          [Fixed Electrode]    [Mass]    [Fixed Electrode]
              |_____________|_____________|
                          ↕↕↕↕
                  Spring Suspension System
  ```

  **Working Process:**

  1. **Drive**: The mass is electrostatically driven to oscillate periodically (typically 1kHz-30kHz)
  2. **Detection**: When the device accelerates along the X-axis, the mass "lags" due to inertia, causing a capacitance change between the mass and fixed electrodes
  3. **Output**: The capacitance change is converted to a voltage signal proportional to acceleration

  This oscillation detection using **Coriolis force** is the mainstream working principle for MEMS gyroscopes (detailed in Section 3), but accelerometers primarily use the above **spring-mass-capacitance detection** scheme.

  ### 2.3 Key Parameters Explained

  When evaluating accelerometers, these parameters determine whether you can obtain valid data for your application:

  **Bias Stability**: The steady-state error of output with zero acceleration input. This is the most important accuracy indicator, typically measured in **mg (milli-gravity)**. Military-grade IMUs can be as low as 10μg, while consumer-grade MEMS is typically 1-10mg.

  **Angular Random Walk (ARW)**: Attitude drift rate caused by noise. For accelerometers, this manifests as the growth rate of attitude error after velocity integration.

  **Bandwidth**: The highest frequency that can be accurately measured. Higher bandwidth means more accurate high-frequency vibration detection, but also more noise.

  **Range**: The maximum measurable acceleration. Consumer electronics typically ±2g, drones commonly use ±16g, while weapons systems may need ±500g. Range and precision are often a trade-off—choose based on your priorities.

  ---

  ## 3. Gyroscopes: The "Magic" of Measuring Rotation

  ### 3.1 Intuitive Understanding of Coriolis Force

  The key to understanding gyroscope principles is Coriolis force.

  Imagine running from the center to the edge of a merry-go-round. From the ground observer's perspective, your path will curve—this is the effect of Coriolis force. The magnitude of this force is proportional to the rotation speed and your radial velocity.

  ```
          Merry-Go-Round Top View
                   O  ← Rotation Center
                  /|
                 / |
                 /  | ← You're running
                /   |
               ←────┘
          Coriolis force direction (perpendicular to your motion and rotation axis)
  ```

  ### 3.2 How MEMS Gyroscopes Work

  Inside a MEMS gyroscope is a **vibrating mass**:

  1. **Drive Mode**: The mass is electrostatically driven to resonate **in-plane**, moving back and forth along the X direction at a fixed frequency (typically 10-50kHz)

  2. **Sense Mode**: When the device rotates around the Z-axis, due to Coriolis force, the mass produces **forced vibration** in the Y direction, perpendicular to the drive direction

  3. **Readout**: Capacitance detection measures the Y-direction displacement, converting it to an electrical signal proportional to angular velocity

  **Key Point**: Drive and sense are **mutually perpendicular**. If drive direction is X, sense direction is Y, measuring rotation around Z-axis. This is the principle of three-axis gyroscopes—three mutually perpendicular drive-sense pairs.

  ```
      X drive ←→ Y sense = Measure Z rotation
      Y drive ←→ Z sense = Measure X rotation
      Z drive ←→ X sense = Measure Y rotation
  ```

  ### 3.3 Key Parameters Explained

  **Angle Random Walk (ARW)**: The most important accuracy indicator for gyroscopes, unit is **°/√hr** or **°/hr^0.5**. It represents the random attitude drift rate caused by noise. For example, 0.5°/√hr means after 1 hour, the 1σ lower bound of attitude error is approximately 0.5°. Fiber optic gyroscopes (FOG) can reach 0.001°/√hr, while consumer-grade MEMS may be 2-5°/√hr.

  **Bias Stability**: The output stability of a gyroscope at zero input, unit is **°/hr**. This is stability as a function of averaging time, different from the random noise described by ARW.

  **Dynamic Range**: The maximum measurable angular velocity. Industrial-grade typically ±500°/s, high-speed rotation measurement requires ±4000°/s or more.

  **Scale Factor Nonlinearity**: The nonlinearity of the proportional relationship between output and input angular velocity, directly affecting measurement accuracy.

  ---

  ## 4. Why Sensor Fusion is Needed

  ### 4.1 Limitations of Individual Sensors

  Understanding the necessity of sensor fusion requires first recognizing the limitations of individual sensors:

  **Accelerometer Issues**: Can measure static tilt angle (pitch/roll) because gravity direction is a stable reference. But it **cannot distinguish between gravitational acceleration and motion acceleration**. When the carrier has acceleration, tilt calculation immediately becomes erroneous—this is particularly evident during drone maneuvers or vehicle turns.

  **Gyroscope Issues**: Can precisely track attitude change rates but suffers from **integration drift**. Even the highest quality gyroscopes will drift several to dozens of degrees per hour. This means relying solely on gyroscope integration for attitude, after 24 hours the error becomes completely unacceptable.

  ### 4.2 Fusion Strategies

  Engineers have developed various algorithms to fuse data from both sensors:

  **Complementary Filter**: The core idea is "use gyroscopes for high frequencies, accelerometers for low frequencies." Gyroscopes are precise and reliable in the short term but drift over time; accelerometers are stable over the long term but have high short-term noise. By using high-pass filtering to extract gyroscope rapid changes and low-pass filtering to extract accelerometer slow stable components, then weighted merging. This method is simple and efficient, widely used in drone flight controls.

  **Kalman Filter**: The optimal state estimation algorithm, which minimizes the mean square error of estimation error given known system models and measurement noise statistical properties. The Extended Kalman Filter (EKF) is the standard algorithm for inertial navigation systems, capable of fusing multiple sensors (GPS, magnetometers, etc.) to provide optimal state estimation.

  **Madgwick/Mahony Algorithms**: Efficient quaternion attitude estimation algorithms specifically designed for microprocessors. The Madgwick algorithm requires only about 150 floating-point operations per step, an order of magnitude faster than EKF, widely used in smartphones and tablets.

  ---

  ## 5. Selection Guidelines: Start from Your Requirements

  Faced with IMU products ranging from a few dollars to tens of thousands of dollars on the market, how do you choose?

  **Step 1: Define Your Application Scenario**

  | Application | Recommended IMU Grade | Typical Bias Stability | Price Range |
  |-------------|----------------------|----------------------|-------------|
  | Smartphones/Wearables | Consumer-grade | 10-100mg | $1-5 |
  | Agricultural Drones/Robots | Industrial-grade | 1-10mg | $50-500 |
  | Autonomous Driving | Industrial/Automotive-grade | 0.1-1mg | $500-2000 |
  | Aviation/Military | Tactical/Navigation-grade | 0.01-0.1mg | $5000+ |
  | Missiles/Aerospace | Navigation-grade | <0.01mg | $50000+ |

  **Step 2: Calculate Your Error Budget**

  Suppose an agricultural drone needs to maintain ±1° attitude accuracy with a 30-minute flight time:
  - If gyroscope ARW is 2°/√hr, the 1σ attitude error after 30 minutes (0.5hr) = 2 × √0.5 ≈ 1.4°
  - This means you need a gyroscope with ARW < 1.4°/√hr, or frequent calibration

  **Step 3: Focus on Environmental Compatibility**

  - Operating temperature range (industrial-grade typically -40°C to 85°C)
  - Vibration resistance (especially important for drone and vehicle applications)
  - EMI compatibility (EMI shielding is critical in complex electromagnetic environments)

  ---

  ## 6. MMES-MCTI Product Recommendations

  For different application scenarios, MMES-MCTI offers a full range of IMU and AHRS products:

  **PA-IMU-01 Series**: Industrial-grade MEMS IMU with 1mg bias stability, 0.5°/√hr ARW, suitable for agricultural drones and industrial robotics

  **PA-AHRS01 Series**: Attitude heading reference system with integrated three-axis magnetometer, directly outputs quaternion attitude, equipped with UART/SPI interface, seamlessly compatible with mainstream flight control systems

  All products support -40°C to 85°C wide temperature operating range and provide customization services to meet special application requirements.

  ---

  ## Conclusion

  Understanding how accelerometers and gyroscopes work is not to become a MEMS design engineer, but to **select correctly, use correctly, and evaluate correctly**.

  When selecting, remember three golden rules:

  > 1. **No perfect sensor exists, only suitable sensors** — Understanding the physical meaning of each parameter helps you judge if it truly matters to you
  > 2. **Systematic errors are easier to handle than random errors** — Bias can be eliminated through calibration, but random walk accumulates over time
  > 3. **Sensor fusion is the soul of IMUs** — Even the best accelerometers and gyroscopes cannot reach their full potential when used separately

  If you have further selection questions or technical support needs, please contact our engineering team.

  ---

  **Recommended Product Images**: PA-IMU-01D.jpg or PA-IMU-01G.jpg

  **Article Tags**: Technical Fundamentals | Sensor Principles | MEMS | Product Selection

  **Reading Time**: Approximately 8 minutes

  ---

  *Written by MMES-MCTI Engineering Team*
